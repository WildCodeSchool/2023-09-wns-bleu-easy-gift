import React from "react";

export async function getServerSideProps(context: any) {
  console.log(context, "coucou");
}

export default function Authentication() {
  function test() {
    console.log("test");
  }
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}
