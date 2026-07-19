import React from "react";

function Tag({ skill }: { skill: string }) {
  return (
    <span className="tag bg-accent py-1 px-2 rounded-2xl text-sm">{skill}</span>
  );
}

export default Tag;
