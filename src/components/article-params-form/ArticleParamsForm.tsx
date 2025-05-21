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
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
// Не забудь в селект онклосе

type Props = {
	formParams: typeof defaultArticleState;
	setFormParams: (params: typeof defaultArticleState) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formParams,
	setFormParams,
	onApply,
	onReset,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onClose: () => console.log('Закрыли меню'),
		onChange: () => setIsOpen(!isOpen),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Select
						options={fontFamilyOptions}
						placeholder='Плейсхолдер'
						selected={formParams.fontFamilyOption}
						onChange={(val) =>
							setFormParams({ ...formParams, fontFamilyOption: val })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formParams.fontSizeOption}
						onChange={(val) =>
							setFormParams({ ...formParams, fontSizeOption: val })
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						placeholder='Плейсхолдер'
						selected={formParams.fontColor}
						onChange={(val) => setFormParams({ ...formParams, fontColor: val })}
						title='Цвет шрифта'
					/>

					<Separator />
					<Select
						options={backgroundColors}
						placeholder='Плейсхолдер'
						selected={formParams.backgroundColor}
						onChange={(val) =>
							setFormParams({ ...formParams, backgroundColor: val })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder='Плейсхолдер'
						selected={formParams.contentWidth}
						onChange={(val) =>
							setFormParams({ ...formParams, contentWidth: val })
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={onApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
