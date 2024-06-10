import { firestore } from "@/Firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const handleWebhooksEvents = async (event) => {
  switch (event.type) {
    case "checkout.session.completed":
      let customer = event.data.object;
      let payment = customer?.amount_total;
      let email = customer?.customer_details?.email;
      let address = customer?.customer_details?.address;
      let name = customer?.customer_details?.name;
      try {
        const usersCollection = collection(firestore, "users");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        const singleUser = querySnapshot?.docs[0];
        let document = doc(firestore, "users", singleUser.id);
        await updateDoc(document, {
          payment: payment / 100,
          address,
          orderSummary: customer.metadata,
        });

        const postsCollectionRef = collection(firestore, "orders");
        await addDoc(postsCollectionRef, {
          cardInfo: customer.metadata,
          email,
          name,
        });
      } catch (error) {
        console.log("🚀 ~ handleWebhooksEvents ~ error:", error);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};
