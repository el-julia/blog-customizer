import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);
	const [formParams, setFormParams] = useState(defaultArticleState);

	const handleApply = useCallback(() => {
		setArticleParams(formParams);
	}, [formParams, setArticleParams]);

	const handleReset = useCallback(() => {
		setArticleParams(defaultArticleState);
		setFormParams(defaultArticleState);
	}, [setArticleParams, setFormParams]);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formParams={formParams}
				setFormParams={setFormParams}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
