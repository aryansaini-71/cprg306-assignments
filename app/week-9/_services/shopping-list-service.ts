import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId: string) => {
  const items: any[] = [];
  try {
    const itemsCollectionRef = collection(db, "users", userId, "items");
    const querySnapshot = await getDocs(query(itemsCollectionRef));

    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.error("Error in getItems: ", error);
  }
  return items;
};

export const addItem = async (userId: string, item: any) => {
  try {
    const itemsCollectionRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsCollectionRef, item);
    return docRef.id; 
  } catch (error) {
    console.error("Error in addItem: ", error);
  }
};