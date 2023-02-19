import React from 'react'

import styles from './CategoriesList.module.css'

const CategoriesList = props => {
    const { onChangeCategory, categories, refresh } = props    

    return (
            <select className={styles.container} autoFocus onChange={(e) => onChangeCategory(e.target.value)}>
                <option value={-1}>Все</option>
                {
                    categories?.map((category) => 
                        <option key={category.categoryId} value={category.categoryId}>
                            {category.name}
                        </option>
                    )
                }
            </select>
    )
}

export default CategoriesList