import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  catFact: string;
}

const CatFactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [catFact, setCatFact] = useState("");

  const onSubmit = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Failed to fetch cat fact");
      }
      const data = await response.json();
      const fact = data.fact;
      setCatFact(fact);
      const textField = document.getElementById("catFact") as HTMLInputElement;
      if (textField) {
        textField.focus();
        textField.setSelectionRange(0, fact.indexOf(" "));
      }
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        id="catFact"
        rows={5}
        cols={50}
        {...register("catFact")}
        value={catFact}
        readOnly
      />
      {errors.catFact && <p>{errors.catFact.message}</p>}
      <button type="submit">Get Cat Fact</button>
    </form>
  );
};

export default CatFactForm;
