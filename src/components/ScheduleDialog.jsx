import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiClock, FiVideo, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import Button from './Button';
import Snackbar from './Snackbar';

/* ─── helpers ─── */
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const buildCalendar = (year, month) => {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay();
    const totalDays = last.getDate();
    const weeks = [];
    let day = 1 - startDay;
    while (day <= totalDays) {
        const week = [];
        for (let i = 0; i < 7; i++, day++) {
            week.push(day >= 1 && day <= totalDays ? new Date(year, month, day) : null);
        }
        weeks.push(week);
    }
    return weeks;
};
// Base slots in Philippine Standard Time (UTC+8)
const BASE_HOURS_PHT = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const PHT_OFFSET_HOURS = 8;

// Compact timezone list grouped by offset with city names
const TIMEZONES = [
    { offset: -12, label: 'UTC-12 Baker Island', tz: 'Etc/GMT+12' },
    { offset: -11, label: 'UTC-11 Midway, Samoa', tz: 'Pacific/Midway' },
    { offset: -10, label: 'UTC-10 Honolulu, Hawaii', tz: 'Pacific/Honolulu' },
    { offset: -9, label: 'UTC-9 Anchorage, Alaska', tz: 'America/Anchorage' },
    { offset: -8, label: 'UTC-8 Los Angeles, Vancouver', tz: 'America/Los_Angeles' },
    { offset: -7, label: 'UTC-7 Denver, Phoenix', tz: 'America/Denver' },
    { offset: -6, label: 'UTC-6 Chicago, Mexico City', tz: 'America/Chicago' },
    { offset: -5, label: 'UTC-5 New York, Toronto', tz: 'America/New_York' },
    { offset: -4, label: 'UTC-4 Santiago, Halifax', tz: 'America/Halifax' },
    { offset: -3, label: 'UTC-3 São Paulo, Buenos Aires', tz: 'America/Sao_Paulo' },
    { offset: -2, label: 'UTC-2 South Georgia', tz: 'Atlantic/South_Georgia' },
    { offset: -1, label: 'UTC-1 Azores, Cape Verde', tz: 'Atlantic/Azores' },
    { offset: 0, label: 'UTC+0 London, Lisbon', tz: 'Europe/London' },
    { offset: 1, label: 'UTC+1 Paris, Berlin, Madrid', tz: 'Europe/Berlin' },
    { offset: 2, label: 'UTC+2 Cairo, Athens, Helsinki', tz: 'Europe/Helsinki' },
    { offset: 3, label: 'UTC+3 Moscow, Riyadh, Nairobi', tz: 'Europe/Moscow' },
    { offset: 3.5, label: 'UTC+3:30 Tehran', tz: 'Asia/Tehran' },
    { offset: 4, label: 'UTC+4 Dubai, Baku', tz: 'Asia/Dubai' },
    { offset: 4.5, label: 'UTC+4:30 Kabul', tz: 'Asia/Kabul' },
    { offset: 5, label: 'UTC+5 Karachi, Tashkent', tz: 'Asia/Karachi' },
    { offset: 5.5, label: 'UTC+5:30 Mumbai, Delhi, Kolkata', tz: 'Asia/Kolkata' },
    { offset: 5.75, label: 'UTC+5:45 Kathmandu', tz: 'Asia/Kathmandu' },
    { offset: 6, label: 'UTC+6 Dhaka, Almaty', tz: 'Asia/Dhaka' },
    { offset: 6.5, label: 'UTC+6:30 Yangon', tz: 'Asia/Yangon' },
    { offset: 7, label: 'UTC+7 Bangkok, Jakarta, Hanoi', tz: 'Asia/Bangkok' },
    { offset: 8, label: 'UTC+8 Manila, Singapore, Perth', tz: 'Asia/Manila' },
    { offset: 9, label: 'UTC+9 Tokyo, Seoul', tz: 'Asia/Tokyo' },
    { offset: 9.5, label: 'UTC+9:30 Adelaide, Darwin', tz: 'Australia/Adelaide' },
    { offset: 10, label: 'UTC+10 Sydney, Melbourne', tz: 'Australia/Sydney' },
    { offset: 11, label: 'UTC+11 Noumea, Solomon Is.', tz: 'Pacific/Noumea' },
    { offset: 12, label: 'UTC+12 Auckland, Fiji', tz: 'Pacific/Auckland' },
    { offset: 13, label: 'UTC+13 Samoa, Tonga', tz: 'Pacific/Apia' },
];

const convertSlots = (selectedOffset) => {
    const diff = selectedOffset - PHT_OFFSET_HOURS;
    return BASE_HOURS_PHT.map(h => {
        let converted = h + diff;
        if (converted < 0) converted += 24;
        if (converted >= 24) converted -= 24;
        const hour12 = converted % 12 === 0 ? 12 : converted % 12;
        const ampm = converted < 12 ? 'AM' : 'PM';
        return `${hour12}:00 ${ampm}`;
    });
};

const detectTzIndex = () => {
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Match by IANA tz name first
    let idx = TIMEZONES.findIndex(t => t.tz === localTz);
    if (idx >= 0) return idx;
    // Fallback: match by offset
    const offsetMin = -new Date().getTimezoneOffset();
    const offsetH = offsetMin / 60;
    idx = TIMEZONES.findIndex(t => t.offset === offsetH);
    return idx >= 0 ? idx : TIMEZONES.findIndex(t => t.offset === 8); // default to PHT
};
/* ─── component ─── */
const ScheduleDialog = ({ isOpen, onClose }) => {
    const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState('calendar'); // calendar | details
    const [form, setForm] = useState({ name: '', email: '', notes: '' });
    const [sending, setSending] = useState(false);
    const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'success' });
    const [tzIndex, setTzIndex] = useState(detectTzIndex);

    const selectedTz = TIMEZONES[tzIndex];
    const timeSlots = useMemo(() => convertSlots(selectedTz.offset), [selectedTz.offset]);


    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Reset when closing
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setStep('calendar');
                setForm({ name: '', email: '', notes: '' });
            }, 300);
        }
    }, [isOpen]);

    const weeks = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

    const formatSelectedDate = () => {
        if (!selectedDate) return '';
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${days[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
                    from_name: 'Portfolio Schedule Meeting',
                    subject: `Meeting Request: ${formatSelectedDate()} at ${selectedTime}`,
                    name: form.name,
                    email: form.email,
                    message: `Meeting request for ${formatSelectedDate()} at ${selectedTime} (${selectedTz.label}).\n\nNotes: ${form.notes || 'None'}`,
                }),
            });
            const data = await res.json();
            if (data.success) {
                onClose();
                setSnackbar({ visible: true, message: 'Meeting request sent! I\'ll confirm shortly.', type: 'success' });
            } else {
                setSending(false);
                setSnackbar({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
            }
        } catch {
            setSending(false);
            setSnackbar({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
        }
    };

    const inputClass = 'w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 transition-all text-sm';

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex justify-center items-center z-[1000] p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="relative w-full max-w-[820px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors border-none cursor-pointer"
                            >
                                <FiX className="text-lg" />
                            </button>

                            <div className="flex flex-col md:flex-row min-h-[480px]">
                                {/* Left panel — meeting info */}
                                <div className="w-full md:w-[240px] bg-gray-50/80 border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col">
                                    <div className="mb-1 text-gray-500 text-xs font-medium uppercase tracking-wider">Jerico De Jesus</div>
                                    <h2 className="font-serif font-bold text-xl text-gray-900 mb-4">30 Minute Meeting</h2>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                        <FiClock className="text-sm" />
                                        <span>30 min</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                        <FiVideo className="text-sm" />
                                        <span>Google Meet</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FFB000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                        <span className="text-xs">{selectedTz.label}</span>
                                    </div>

                                    {selectedDate && selectedTime && (
                                        <div className="mt-auto pt-6 border-t border-gray-200">
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Selected</div>
                                            <div className="text-sm font-semibold text-gray-900">{formatSelectedDate()}</div>
                                            <div className="text-sm text-[#FFB000] font-semibold">{selectedTime}</div>
                                        </div>
                                    )}
                                </div>

                                {/* Right panel — calendar or details form */}
                                <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
                                    <AnimatePresence mode="wait">
                                        {step === 'calendar' ? (
                                            <motion.div
                                                key="calendar"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="font-semibold text-gray-900 text-base mb-5">Select a Date & Time</h3>

                                                <div className="flex flex-col md:flex-row gap-6">
                                                    {/* Calendar grid */}
                                                    <div className="flex-1 min-w-0">
                                                        {/* Month nav */}
                                                        <div className="flex items-center justify-between mb-4">
                                                            <button
                                                                onClick={prevMonth}
                                                                disabled={!canGoPrev}
                                                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed bg-transparent border-none cursor-pointer transition-colors"
                                                            >
                                                                <FiChevronLeft />
                                                            </button>
                                                            <span className="font-semibold text-gray-900 text-sm">{MONTHS[viewMonth]} {viewYear}</span>
                                                            <button
                                                                onClick={nextMonth}
                                                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 bg-transparent border-none cursor-pointer transition-colors"
                                                            >
                                                                <FiChevronRight />
                                                            </button>
                                                        </div>

                                                        {/* Day headers */}
                                                        <div className="grid grid-cols-7 mb-1">
                                                            {DAYS.map(d => (
                                                                <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase py-1">{d}</div>
                                                            ))}
                                                        </div>

                                                        {/* Day cells */}
                                                        {weeks.map((week, wi) => (
                                                            <div key={wi} className="grid grid-cols-7">
                                                                {week.map((date, di) => {
                                                                    if (!date) return <div key={di} />;
                                                                    const isPast = date < today;
                                                                    const isToday = isSameDay(date, today);
                                                                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                                                                    return (
                                                                        <button
                                                                            key={di}
                                                                            disabled={isPast}
                                                                            onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                                                            className={`
                                                                                w-full aspect-square flex items-center justify-center text-sm rounded-full border-none cursor-pointer transition-all
                                                                                ${isPast ? 'text-gray-300 cursor-not-allowed bg-transparent' : ''}
                                                                                ${isSelected ? 'bg-[#FFB000] text-gray-900 font-bold' : ''}
                                                                                ${isToday && !isSelected ? 'text-[#FFB000] font-bold bg-transparent' : ''}
                                                                                ${!isPast && !isSelected && !isToday ? 'text-gray-700 hover:bg-[#FFB000]/10 bg-transparent' : ''}
                                                                            `}
                                                                        >
                                                                            {date.getDate()}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        ))}

                                                        {/* Timezone selector */}
                                                        <div className="mt-4">
                                                            <label className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5 font-medium">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 inline-block" viewBox="0 0 24 24" fill="none" stroke="#FFB000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> Time zone
                                                            </label>
                                                            <select
                                                                value={tzIndex}
                                                                onChange={e => { setTzIndex(Number(e.target.value)); setSelectedTime(null); }}
                                                                className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium focus:outline-none focus:border-[#FFB000] focus:ring-2 focus:ring-[#FFB000]/20 cursor-pointer transition-all appearance-none"
                                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFB000' d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                                                            >
                                                                {TIMEZONES.map((tz, i) => (
                                                                    <option key={tz.tz} value={i}>
                                                                        {tz.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* Time slots */}
                                                    {selectedDate && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className="w-full md:w-[150px] flex-shrink-0"
                                                        >
                                                            <div className="text-xs font-semibold text-gray-900 mb-3">{formatSelectedDate()}</div>
                                                            <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                                                                {timeSlots.map(time => (
                                                                    <button
                                                                        key={time}
                                                                        onClick={() => setSelectedTime(time)}
                                                                        className={`
                                                                            px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer
                                                                            ${selectedTime === time
                                                                                ? 'bg-[#FFB000] text-gray-900 border-[#FFB000]'
                                                                                : 'bg-white text-gray-700 border-gray-200 hover:border-[#FFB000] hover:text-[#FFB000]'}
                                                                        `}
                                                                    >
                                                                        {time}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Next button */}
                                                {selectedDate && selectedTime && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-6 flex justify-end"
                                                    >
                                                        <button
                                                            onClick={() => setStep('details')}
                                                            className="bg-[#FFB000] text-gray-900 font-bold text-sm px-8 py-3 rounded-full border-none cursor-pointer hover:bg-[#e6a000] transition-colors"
                                                        >
                                                            Next
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="details"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <button
                                                    onClick={() => setStep('calendar')}
                                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer mb-4 transition-colors"
                                                >
                                                    <FiArrowLeft /> Back
                                                </button>

                                                <h3 className="font-semibold text-gray-900 text-base mb-5">Enter Your Details</h3>

                                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name *</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={form.name}
                                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                            placeholder="Your name"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email *</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={form.email}
                                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                            placeholder="your@email.com"
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Additional Notes</label>
                                                        <textarea
                                                            value={form.notes}
                                                            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                                                            placeholder="Tell me about your project or what you'd like to discuss..."
                                                            rows={3}
                                                            className={`${inputClass} resize-none`}
                                                        />
                                                    </div>

                                                    <div className="mt-2">
                                                        <button
                                                            type="submit"
                                                            disabled={sending}
                                                            className="w-full bg-[#FFB000] text-gray-900 font-bold text-sm px-8 py-3.5 rounded-full border-none cursor-pointer hover:bg-[#e6a000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {sending ? 'Scheduling...' : 'Schedule Meeting'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Snackbar
                message={snackbar.message}
                type={snackbar.type}
                isVisible={snackbar.visible}
                onClose={() => setSnackbar(s => ({ ...s, visible: false }))}
            />
        </>
    );
};

export default ScheduleDialog;
