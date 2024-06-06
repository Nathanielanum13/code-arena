export default class Duration {
    /**
     * 
     * @param {number} duration 
     * `Provide duration in milliseconds:`
     * **seconds * 1000**
     */
    constructor(duration) {
        this.duration = duration
    }

    conv = {
        WEEK: 604800,
        DAY: 86400,
        HOUR: 3600,
        MINUTE: 60
    }

    defaultTrans = {
        week: "week",
        day: "day",
        hour: "hour",
        minute: "minute",
        second: "second"
    }

    /**
     * `Outputs class constructor argument in seconds`
     */
    get toSeconds() {
            return this.duration / 1000
        }
        /**
         * `Outputs class constructor argument in weeks`
         */
    get toWeeks() {
            const rem = this.toSeconds % this.conv.WEEK
            return {
                remainderInSeconds: rem,
                numberOfWeeks: (this.toSeconds - rem) / this.conv.WEEK
            }
        }
        /**
         * `Outputs class constructor argument in days`
         */
    get toDays() {
        const rem = this.toSeconds % this.conv.DAY
        return {
            remainderInSeconds: rem,
            numberOfDays: (this.toSeconds - rem) / this.conv.DAY
        }
    }

    /**
     * `Outputs class constructor argument in hours`
     */
    get toHours() {
        const rem = this.toSeconds % this.conv.HOUR
        return {
            remainderInSeconds: rem,
            numberOfHours: (this.toSeconds - rem) / this.conv.HOUR
        }
    }

    /**
     * `Outputs class constructor argument in minutes`
     */
    get toMinutes() {
        const rem = this.toSeconds % this.conv.MINUTE
        return {
            remainderInSeconds: rem,
            numberOfMinutes: (this.toSeconds - rem) / this.conv.MINUTE
        }
    }

    /**
     * `Outputs Translations for Duration formats`
     */
    get getTrans() {
        return this.defaultTrans
    }

    /**
     * @param {string} preferredTrans
     */
    set setWeekTrans(preferredTrans) {
        this.defaultTrans.week = preferredTrans || this.defaultTrans.week
    }

    /**
     * @param {string} preferredTrans
     */
    set setDayTrans(preferredTrans) {
        this.defaultTrans.day = preferredTrans || this.defaultTrans.day
    }

    /**
     * @param {string} preferredTrans
     */
    set setHourTrans(preferredTrans) {
        this.defaultTrans.hour = preferredTrans || this.defaultTrans.hour
    }

    /**
     * @param {string} preferredTrans
     */
    set setMinuteTrans(preferredTrans) {
        this.defaultTrans.minute = preferredTrans || this.defaultTrans.minute
    }

    /**
     * @param {string} preferredTrans
     */
    set setSecondTrans(preferredTrans) {
        this.defaultTrans.second = preferredTrans || this.defaultTrans.second
    }

    /**
     * @param {string} separator
     * `Converts milliseconds to e.g 1 week 3 days 11 hours`
     */
    formatAll(separator = "") {
        const temp = this.duration

        const weeks = this.formatInWeek()
        this.duration = this.toMilliSeconds(this.toWeeks.remainderInSeconds)

        const days = this.formatInDay()
        this.duration = this.toMilliSeconds(this.toDays.remainderInSeconds)

        const hours = this.formatInHour()
        this.duration = this.toMilliSeconds(this.toHours.remainderInSeconds)

        const minutes = this.formatInMinute()
        this.duration = this.toMilliSeconds(this.toMinutes.remainderInSeconds)

        const seconds = this.formatInSecond(this.toSeconds)

        this.duration = temp

        return weeks + separator +
            days + separator +
            hours + separator +
            minutes + separator +
            seconds
    }

    /**
     * @param {number} num
     * `Converts milliseconds to a formated week. e.g 3 weeks`
     */
    formatInWeek(num = this.toWeeks.numberOfWeeks) {
        return num === 0 || num < 1 ?
            "" :
            num === 1 ?
            `${num} ${this.defaultTrans.week}` :
            `${num} ${this.defaultTrans.week}s`
    }

    /**
     * @param {number} num
     * `Converts milliseconds to a formated day. e.g 10 days`
     */
    formatInDay(num = this.toDays.numberOfDays) {
        return num === 0 || num < 1 ?
            "" :
            num === 1 ?
            `${num} ${this.defaultTrans.day}` :
            `${num} ${this.defaultTrans.day}s`
    }

    /**
     * @param {number} num
     * `Converts milliseconds to a formated hour. e.g 1 hour`
     */
    formatInHour(num = this.toHours.numberOfHours) {
        return num === 0 || num < 1 ?
            "" :
            num === 1 ?
            `${num} ${this.defaultTrans.hour}` :
            `${num} ${this.defaultTrans.hour}s`
    }

    /**
     * @param {number} num
     * `Converts milliseconds to a formated minute. e.g 2 minutes`
     */
    formatInMinute(num = this.toMinutes.numberOfMinutes) {
        return num === 0 || num < 1 ?
            "" :
            num === 1 ?
            `${num} ${this.defaultTrans.minute}` :
            `${num} ${this.defaultTrans.minute}s`
    }

    /**
     * @param {number} num
     * `Converts milliseconds to a formated second. e.g 1 second`
     */
    formatInSecond(num = this.toSeconds) {
        return num === 0 || num < 1 ?
            "" :
            num === 1 ?
            `${num} ${this.defaultTrans.second}` :
            `${num} ${this.defaultTrans.second}s`
    }

    /**
     * @param {number} seconds
     * `Converts seconds to milliseconds`
     */
    toMilliSeconds(seconds = this.toSeconds) {
        return seconds * 1000
    }
}