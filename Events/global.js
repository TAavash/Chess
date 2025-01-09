import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";
import { renderHighlight } from "../Render/main.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { clearPreviousSelfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";

//highlighted or not
let highlight_state = false;

//current self highlighted square state
let selfHighlightState = null;

//in move state or not
let moveState = null;

function WhitePawnClick({ piece }) {
  //if clicked on same element twice
  if (piece == selfHighlightState) {
    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
    return;
  }

  //higlight clicked piece
  clearPreviousSelfHighlight(selfHighlightState);
  selfHighlight(piece);
  selfHighlightState = piece;

  //add piece as move state
  moveState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();

  //pawn initial position
  if (piece.current_position[1] == "2") {
    const hightlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];

    //clear board for any previous hightlight
    clearHighlight();

    hightlightSquareIds.forEach((hightlight) => {
      globalState.forEach((row) => {
        row.forEach((element) => {
          if (element.id == hightlight) {
            element.highlight(true);
          }
        });
      });
    });
  }
}

function GlobalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickedID = event.target.parentNode.id;
      const flatArray = globalState.flat();
      const square = flatArray.find((el) => el.id == clickedID);
      if (square.piece.piece_name == "WHITE_PAWN") {
        WhitePawnClick(square);
      }
    } else {
      const childElementsOfclickedE1 = Array.from(event.target.childNodes);

      if (
        childElementsOfclickedE1.length == 1 ||
        event.target.localName == "span"
      ) {
        if (event.target.localName == "span") {
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          const id = event.target.id;
          moveElement(moveState, id);
        }
      } else {
        clearHighlight();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

export { GlobalEvent };
