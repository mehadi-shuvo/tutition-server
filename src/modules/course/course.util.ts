import { Review } from '../review/review.model';

export const getTheBestCourse = async () => {
  const reviews = await Review.find();
  const courseIds: string[] = reviews.map((re) => re.courseId.toHexString());
  const uniqueIs: string[] = Array.from(new Set(courseIds));
  // console.log(uniqueArray);

  const reviewTotalCounts: {
    totalRating: number;
    count: number;
    courseId: string;
  }[] = uniqueIs.map((id) => {
    let totalRating = 0,
      count = 0;
    for (let i = 0; i < reviews.length; i++) {
      if (id === reviews[i].courseId.toHexString()) {
        totalRating += reviews[i].rating;
        count += 1;
      }
    }
    return {
      courseId: id,
      totalRating: totalRating,
      count: count,
    };
  });
  // console.log({ reviewTotalCounts });

  const reviewAverage: { courseId: string; averageRate: number }[] =
    reviewTotalCounts.map((el) => {
      const averageRate = el.totalRating / el.count;
      return {
        courseId: el.courseId,
        averageRate,
      };
    });
  // console.log(reviewAverage);
  const bestCourse = { rating: 0, courseId: '' };
  for (let i = 0; i < reviewAverage.length; i++) {
    if (bestCourse.rating < reviewAverage[i].averageRate) {
      bestCourse.rating = reviewAverage[i].averageRate;
      bestCourse.courseId = reviewAverage[i].courseId;
    }
  }

  return { bestCourse, totalReview: reviews.length };
};
