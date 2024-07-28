import React, { useState } from 'react'
import styles from './Pagination.module.scss';
// import styles from './Pagination.scss';
import { IconImage } from '@/components';

interface PaginationProps {
	page: number;
	totalEvents: number;
	limit: number;
	setPage: (page: number) => void;
	totalPages: number;
}

function Pagination({
  page,
	totalEvents,
	limit,
	setPage,
	totalPages
}: PaginationProps) {
  const numPages = Math.ceil(totalEvents / limit);
  const [currPage, setCurrPage] = useState(page);
  const firstNum = currPage - (currPage % 5) + 1;
  const lastNum = currPage - (currPage % 5) + 5;

  const moveToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrPage(page - 2);
    }
  }

  const moveToNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1);
      setCurrPage(page);
    }
  }

  return (
		<div className={styles.page__area}>
			<button 
        className={`${styles.page__move} ${page === 1 ? 'empty' : ''}`}
				onClick={() => moveToPrevPage()} 
			>
				{page !== 1 
					? <IconImage icon={'ARROWLEFT'} />
					: null
				}
			</button>
			<button
				className={`${styles.page__btn} ${page === firstNum ? 'active' : ''}`}
				onClick={() => setPage(firstNum)}
			>
				{firstNum}
			</button>
			{Array(totalPages-1 < 5 ? totalPages-1 : 4).fill(null).map((_, i) =>{
				if(i <=2){
					return (
						<button
							className={`${styles.page__btn} ${page === firstNum+1+i ? 'active' : ''}`}
							key={i+1} 
              onClick={() => { setPage(firstNum + 1 + i)}}
						>
							{firstNum+1+i}
						</button>
					)
				}
				else if(i>=3){
					return (
						<button 
              className={styles.page__btn}
							key ={i+1}
							onClick={() => setPage(lastNum)}
						>
							{lastNum}
						</button>
					)  
				}
			})}
			<button 
				className={`${styles.page__move} ${page === numPages ? 'empty' : ''}`}
				onClick={() => moveToNextPage()} 
			>
				{page !== numPages 
					? <IconImage icon={'ARROWRIGHT'} />
					: null
				}
				</button>
			{/* </div> */}
		</div>
  )
}

export { Pagination };