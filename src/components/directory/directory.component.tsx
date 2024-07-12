import { FC } from "react";
import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryCategory } from "../../routes/home/home.component";

import { DirectoryContainer } from './directory.styles';

type DirectoryProps = {
    categories: DirectoryCategory[]
}

const Directory: FC<DirectoryProps> = ({ categories }) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </DirectoryContainer>
    )
}

export default Directory;