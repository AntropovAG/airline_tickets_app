import React from 'react';

import styles from './filtersForm.module.css';

interface FiltersFormProps {
    title: string;
    children?: React.ReactNode;
    handlechange?: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

export default function FiltersForm({ title, children, handlechange }: FiltersFormProps) {
    return (
        <>
            <form className={styles.container} onChange={handlechange}>
                <p className={styles.title}>{title}</p>
                {children}
            </form>
        </>
    );
}
