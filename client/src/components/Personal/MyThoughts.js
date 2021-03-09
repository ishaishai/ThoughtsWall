import { useState, useEffect } from "react";
import axios from "axios";

const MyThoughts = () => {
  const [thoughts, setThoughts] = useState(null);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/my-thoughts");
    console.log(response.data);
  }, []);
  return <div> My Thoughts</div>;
};

export default MyThoughts;
