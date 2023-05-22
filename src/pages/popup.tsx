import { usePassportPopupSetup } from '@pcd/passport-interface'

export default function PassportPopup() {
  return <div>{usePassportPopupSetup()}</div>
}
