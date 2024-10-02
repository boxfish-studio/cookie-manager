import './Button.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export function Button({ type = 'button', ...buttonProps }: ButtonProps): React.JSX.Element {
	return <button {...buttonProps} />
}
