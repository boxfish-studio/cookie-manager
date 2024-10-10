import styles from './page.module.css'

export default function Home(): React.JSX.Element {
	return (
		<div className={styles.page}>
			<main className={styles.main}>NextJS Demo</main>
		</div>
	)
}
