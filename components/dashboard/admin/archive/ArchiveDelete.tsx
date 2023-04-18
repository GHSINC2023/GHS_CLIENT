import React from 'react'
import styles from '../../../../styles/components/dashboard/archive/archiveDelete.module.scss'
import { useMutation } from '@apollo/client';
import { deleteArchive } from '../../../../util/archive/archive.mutation';


export default function ArchiveDelete({ id, close }: any) {



    const [ ArchiveDelete ] = useMutation(deleteArchive)

    const DeleteArchive = (e: any) => {
        e.preventDefault();
        ArchiveDelete({
            variables: {
                archiveId: id
            },
            onCompleted: () => {
                close("")
            }
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h2>Delete</h2>
                <p>Are you sure you want to delete?</p>
                <div className={styles.btnDel}>
                    <button onClick={() => close("")}>Cancel</button>
                    <button type="button" onClick={DeleteArchive}>Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}
