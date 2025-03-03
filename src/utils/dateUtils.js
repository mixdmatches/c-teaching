import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration)

export const formatTime = (time) => {
    if (time === undefined || time === null) {
        return "";
    }
    return dayjs.duration(time, 'second').format('HH:mm:ss');
}