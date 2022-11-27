import './index.css'

const TabItem = props => {
  const {tabDetails, activeTab, changeActiveTab} = props
  const {label, value} = tabDetails

  const className = activeTab === value ? 'active' : 'tab-item'

  const onClickTabItem = () => {
    changeActiveTab(value)
  }

  return (
    <li className={className} onClick={onClickTabItem}>
      {label}
    </li>
  )
}
export default TabItem
