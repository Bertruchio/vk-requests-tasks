export const fetchAge = async (name: string): Promise<{ age: number }> => {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch age");
  }
  const data = await response.json();
  return { age: data.age };
};
