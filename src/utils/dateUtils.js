import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)

export const formatTime = (time,format='HH:mm:ss') => {
    if (time === undefined || time === null) {
        return "";
    }
    return dayjs.duration(time, 'second').format(format);
}
export const formatToMinute = (seconds) => {
    if (!seconds){
        return 0
    }
    return (seconds/60).toFixed(2)
}