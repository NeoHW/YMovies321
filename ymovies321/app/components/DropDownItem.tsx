import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import moment from "moment";

const DropDownItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const DropDownItem = (item: any) => {
    console.log(item);
    console.log(item.title);
    console.log(item.poster_path);
    console.log(item);
    return (
        <DropDownItemContent>
            <img
                src={item.poster_path 
                    ? `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_path}`
                    : "../images/no-image-available.png"}
                width={24}
                height={24}
                alt={item.title ? item.title : item.original_title}
            />
            <div>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">
                    {moment(item.release_date).format("YYYY")}
                </Typography>
                <Typography variant="body2">
                    {item.vote_average ? item.vote_average.toFixed(1) / 10 : "N/A"}
                </Typography>
            </div>
        </DropDownItemContent>
    );
};

export default DropDownItem;
