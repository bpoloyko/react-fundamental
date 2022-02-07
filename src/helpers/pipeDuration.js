export const pipeDuration = (duration) => {
	if (duration < 0) {
		return '';
	}
	return `${String(Math.floor(duration / 60)).padStart(2, '0')}:${String(
		duration % 60
	).padStart(2, '0')} hours`;
};
