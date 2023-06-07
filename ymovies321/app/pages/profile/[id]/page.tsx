import { usePathname } from 'next/navigation';

function extractIdFromPath(pathName : string) {
    // extracting out the id from URL path
    const regex = /\/pages\/profile\/(\d+)/;
        const match = pathName.match(regex);
        
        if (match && match[1]) {
            return match[1];
        }
        
        return null;
}

function Profile() {
    console.log(extractIdFromPath(usePathname()));
    return (
        <div>
            <h2>
                hi
            </h2>
        </div>
    )
}