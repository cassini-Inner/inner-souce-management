import * as Icons from "react-feather";
import PropTypes from "prop-types";
import React from "react";

// expanded: show all the starts on only one start with color
// rating: integer value denoting the rating
// setRating: a callback function to set the rating
// editable: if the rating displayed is editable. Calls setRating on clicking a star
export const RatingDisplay = ({ expanded, rating, setRating, editable, condensed }) => {
    let color = "";
    if (rating >= 1 && rating < 2) {
        color = "nebula-red";
    } else if (rating >= 2 && rating <= 3) {
        color = "nebula-yellow";
    } else if (rating > 3) {
        color = "nebula-green";
    }

    return (
        <div className="flex flex-row cursor-pointer items-center" >
            {expanded &&
          [1, 2, 3, 4, 5].map(value => {
              if (value <= rating) {
                  return(
                      <Icons.Star
                          onClick = {editable ? () => setRating(value) : null}
                          className={("fill-current text-" + color) + (condensed ? " h-4 w-4 mr-1" : " h-5 w-5 mr-1")}
                          key = {value}
                      />
                  );
              }
              return <Icons.Star
                  onClick={editable ? () => setRating(value) : null}
                  key={value}
                  className={("fill-current text-nebula-grey-500") + (condensed ? " h-4 w-4 mr-1" : " h-5 w-5 mr-1")}
              />;
          })
            }
            {!expanded &&
          <div className={"flex flex-row items-center " + (condensed ? " space-x-1 " : " space-x-2 ")}>
              <Icons.Star className={"fill-current text-" + color + (condensed ? "  h-4 w-4 " : " h-5 w-5 ")}/>
              <p className={`text-${color} ` + (condensed ? " text-sm " : " text-lg ")}>{rating}</p>
          </div>
            }
        </div>
    );
};

RatingDisplay.propTypes = {
    expanded: PropTypes.bool,
    rating: PropTypes.number,
};
