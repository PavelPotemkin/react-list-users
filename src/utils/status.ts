import {IStatus} from "../../types/status";
import {ISelect} from "../ui/select/AppSelect";

const convertStatusesIntoSelectOptions = (statuses: IStatus[]): ISelect['options']=> {
  return statuses.map(status => {
    return {
      label: status.statusText,
      value: String(status.code)
    }
  })
}

export default convertStatusesIntoSelectOptions