const InputNumber = (props = {}) => {
  const {
    value = null,
    defaultValue = null,
    onChange = (e) => { }
  } = props

  const [inputValue, setInputValue] = useState(defaultValue || value)
  const doOnChange = (e) => {
    setInputValue(e.target.value)
    onChange(e)
  }

  return (
    <input type="number" value={inputValue} onChange={doOnChange} />
  )
}