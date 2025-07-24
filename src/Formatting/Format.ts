
export default class Format {
    private static NumberAbbreviations: string[] = [
        "K", // 4 digits
        "M", // 7 digits
        "B", // 10 digits
        "T", // 13 digits
        "QD", // 16 digits
        "QT", // 19 digits
        "SXT", // 22 digits
        "SEPT", // 25 digits
        "OCT", // 28 digits
        "NON", // 31 digits
        "DEC", // 34 digits
        "UDEC", // 37 digits
        "DDEC", // 40 digits
    ];

    private static romanNumerals: Array<[number, string]> = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];

    public static AbbreviateNumber(num: number, decimals: number = 0): string {
        let visible = undefined;
        let suffix = undefined;

        if(num < 1000) {
            visible = num * math.pow(10, decimals);
            suffix = "";
        }
        else
        {
            const digits = math.floor(math.log10(num)) + 1;
            const index = math.min(this.NumberAbbreviations.size(), math.floor((digits - 1) / 3));
            visible = num / math.pow(10, index * 3 - decimals);
            suffix = this.NumberAbbreviations[index];
        }

        const front = visible / math.pow(10, decimals);
        const back = visible % math.pow(10, decimals);

        if(decimals > 0) {
            if(num < 1000) {
                return string.format("%i", front);
            }
            else {
                return string.format("%i.%0." + tostring(decimals) + "i%s", front, back, suffix);
            }
        }
        else {
            return string.format("%i%s", front, suffix);
        }
    }

    public static RomanizeNumber(num: number): string {
        let romanNumeral = "";
        

        for(const numeral of this.romanNumerals) {
            const val = numeral[0];
            const roman = numeral[1];
            while (num >= val) {
                romanNumeral = romanNumeral + roman;
                num -= val;
            }
        }

        return romanNumeral;
    }

    public static SecondsToTime(sec: number): ITime {
        const secondsInMinute = 60;
        const secondsInHour = secondsInMinute * 60;
        const secondsInDay = secondsInHour * 24;
        const secondsInWeek = secondsInDay * 7;
        const secondsInMonth = secondsInDay * 30.44; // average month
        const secondsInYear = secondsInDay * 365.25; // includes leap years

        const years = math.floor(sec / secondsInYear);
        sec %= secondsInYear;

        const months = math.floor(sec / secondsInMonth);
        sec %= secondsInMonth;

        const weeks = math.floor(sec / secondsInWeek);
        sec %= secondsInWeek;

        const days = math.floor(sec / secondsInDay);
        sec %= secondsInDay;

        const hours = math.floor(sec / secondsInHour);
        sec %= secondsInHour;

        const minutes = math.floor(sec / secondsInMinute);
        const seconds = math.floor(sec % secondsInMinute);

        const result: ITime = { seconds };

        if (minutes > 0) result.minutes = minutes;
        if (hours > 0) result.hours = hours;
        if (days > 0) result.days = days;
        if (weeks > 0) result.weeks = weeks;
        if (months > 0) result.months = months;
        if (years > 0) result.years = years;

        return result;
    }

    public static TimeToString(timeInterface: ITime): string {
        let retString = "";
        if (timeInterface.years !== undefined && timeInterface.years > 0) {retString += timeInterface.years + " years(s) ";}
        if (timeInterface.months !== undefined && timeInterface.months > 0) {retString += timeInterface.months + " months(s) ";}
        if (timeInterface.weeks !== undefined && timeInterface.weeks > 0) {retString += timeInterface.weeks + " weeks(s) ";}
        if (timeInterface.days !== undefined && timeInterface.days > 0) {retString += timeInterface.days + " days(s) ";}
        if (timeInterface.hours !== undefined && timeInterface.hours > 0) {retString += timeInterface.hours + " hours(s) ";}
        if (timeInterface.minutes !== undefined && timeInterface.minutes > 0) {retString += timeInterface.minutes + " minutes(s) ";}
        retString += timeInterface.minutes + " second(s) ";
        return retString;
    }
}


export interface ITime {
    seconds: number,
    minutes?: number,
    hours?: number,
    days?: number,
    weeks?: number,
    months?: number,
    years?: number
}