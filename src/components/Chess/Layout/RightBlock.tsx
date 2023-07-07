import styles from './styles/RightBlock.module.scss';

interface RightBlockInterface {
    children?: React.ReactNode;
}

const RightBlock = (props: RightBlockInterface) => {
    const children = props.children;

    return (
        <div className={styles.RightBlockWrapper}>
            {children}
        </div>
    );
};

export default RightBlock;