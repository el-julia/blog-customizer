import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';


import styles from './ArticleParamsForm.module.scss';

import { clsx } from 'clsx';

import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors, contentWidthArr
} from 'src/constants/articleProps';

import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
// Не забудь в селект онклосе

export const ArticleParamsForm = () => {




	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onClose: () => console.log('Закрыли меню'),
		onChange: () => setIsOpen(!isOpen),
	});
	const [selectedFontSize, setSelectedFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);

	const [selectedFontColor, setSelectedFontColor] = useState(
		defaultArticleState.fontColor
	);

	const [selectedBackgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);

	const [selectedContentWidthArr, setContentWidthArr] = useState(
		defaultArticleState.contentWidth
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside ref={asideRef} className={clsx(styles.container, {[styles.container_open]: isOpen})}>
				<form className={styles.form}>
					<Select options={ fontFamilyOptions } placeholder='Плейсхолдер' selected={selectedFontFamily} onChange={setSelectedFontFamily} title='Шрифт'/>
					<RadioGroup name='fontSize' options={ fontSizeOptions } selected={selectedFontSize} onChange={setSelectedFontSize} title='Размер шрифта' />
					<Select options={ fontColors } placeholder='Плейсхолдер' selected={selectedFontColor} onChange={setSelectedFontColor} title='Цвет шрифта'/>

					<Separator />
					<Select options={ backgroundColors } placeholder='Плейсхолдер' selected={selectedBackgroundColor} onChange={setBackgroundColor} title='Цвет фона'/>
					<Select options={ contentWidthArr } placeholder='Плейсхолдер' selected={selectedContentWidthArr} onChange={setContentWidthArr} title='Ширина контента'/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
