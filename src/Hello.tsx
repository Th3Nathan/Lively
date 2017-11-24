import * as React from 'react';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error("you could be more enthusiastic");
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    )
}

export default Hello;

// helpers 

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}