import Link from 'next/link';
import { Typography } from "@mui/material";
import moment from "moment";


export default function MovieCard({ item }) {
    return (
        <Link href={"/pages/details/" + item.id} key={item.id}>
            <div className="ml-3 w-40 h-128 max-w-xs overflow-hidden cursor-pointer" key={item.id}>
                <img
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "../images/no-image-available.png";
                    }}
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={item.title ? item.title : item.name}
                />
                <div className="pl-1">
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" style={{ display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title ? item.title : item.name}
                    </Typography>
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" >
                        {moment(item.release_date).format("YYYY")}
                    </Typography>
                    <Typography sx={{ color: "#00adb5" }} variant="subtitle2" >
                        <p>{item.vote_average} / 10</p>
                    </Typography>
                </div>
            </div>
        </Link>
    )
}