import { FC } from 'react';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { DirectoryCategory } from '../../routes/home/home.component';

type DirectoryItemProps = {
    category: DirectoryCategory
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { title, imageUrl } = category;
    return (
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />

            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;