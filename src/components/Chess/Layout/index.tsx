import styles from './styles/Wrapper.module.scss';

interface ChessWrapperInterface {
    children?: React.ReactNode;
}

const Wrapper = (props: ChessWrapperInterface) => {
    const children = props.children;

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export default Wrapper;