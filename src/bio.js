import React from "react";

export function Bio({ bio, first, last, clickHandler }) {
    bio = bio || "go on, write your bio";
    return (
		<div className="bio"
		onClick={clickHandler}
>

		<p>hallo {first} {last}</p>
		<p>{bio}</p>
		</div>
    );
}
