"use client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "./config";

export const getCards = async () => {
  let data = await getDocs(collection(firestore, "Cards"));
  let mydata = [];
  data.forEach((item) => mydata.push(item.data()));
  const newData = mydata.map((item) => {
    const newObj = [];
    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        const { price, title } = item[key];
        newObj.push({ price, title });
      }
    }
    return newObj;
  });
  return newData;
};

export const getTemplates = async () => {
  try {
    let data = await getDocs(collection(firestore, "Templates"));
    let mydata = [];
    data.forEach((item) => mydata.push({ id: item.id, ...item.data() }));

    return { status: true, record: mydata };
  } catch (error) {
    console.log("🚀 ~ getTemplates ~ error:", error);
    return { status: false };
  }
};

export const singleTemplate = async (templateId) => {
  const templateRef = doc(collection(firestore, "Templates"), templateId);

  try {
    // Fetch the document's data
    const templateSnapshot = await getDoc(templateRef);

    // Check if the document exists
    if (templateSnapshot.exists()) {
      // Access the document data
      const templateData = templateSnapshot.data();
      return { status: true, record: templateData };
    } else {
      throw "error";
    }
  } catch (error) {
    return { status: false };
  }
};
