import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import moment from "moment";

const DropDownItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const DropDownItem = (item: any) => {
    // for some reason item is nested within another item??
    item = item.item;

    return (
        <DropDownItemContent>
            <img
                src={item.poster_image
                    ? `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_image}`
                    : "../images/no-image-available.png"}
                width={24}
                height={24}
                alt={item.name}
            />
            <div>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">
                    {moment(item.release_date).format("YYYY")}
                </Typography>
                <Typography variant="body2">
                    {item.vote_average ? item.vote_average.toFixed(1) / 10 : "NA"}
                </Typography>
            </div>
        </DropDownItemContent>
    );
};

export default DropDownItem;
