import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import moment from "moment";

const DropDownItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const DropdownItem = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const DropDownItem = ({ item }: { item: any }) => {

    return (
        <Link href={"/pages/details/" + item.id} key={item.id}>
            <DropdownItem>
                <DropDownItemContent>
                    <img
                        src={item.poster_image
                            ? `https://image.tmdb.org/t/p/w220_and_h330_face${item.poster_image}`
                            : "../images/no-image-available.png"}
                        width={64}
                        height={64}
                        alt={item.name}
                    />
                    <div>
                        <Typography sx={{ color: "#000000" }} variant="subtitle2">
                            {item.name}
                        </Typography>
                        <Typography sx={{ color: "#000000" }} variant="subtitle2">
                            {moment(item.release_date).format("YYYY")}
                        </Typography>
                        <Typography sx={{ color: "#000000" }} variant="subtitle2">
                            {item.vote_average.toFixed(1)} / 10
                        </Typography>
                    </div>
                </DropDownItemContent>
            </DropdownItem>
        </Link>
    );
};

export default DropDownItem;
