import { CourseExcludeFields } from '../../modules/course/course.const';
import { TCourse, TTags } from '../../modules/course/course.interface';
import { Course } from '../../modules/course/course.model';

const filterByLevel = (data: TCourse[], level: string): TCourse[] => {
  return data.filter((course: TCourse) => course.details.level === level);
};

const filterByTags = (data: TCourse[], tags: string): TCourse[] => {
  return data.filter((course: TCourse) =>
    course.tags.some((tag: TTags) => tag.name === tags),
  );
};

const filterByPriceRange = (
  data: TCourse[],
  minPrice: string,
  maxPrice: string,
): TCourse[] => {
  return data.filter(
    (course: TCourse) =>
      course.price >= parseFloat(minPrice) &&
      course.price <= parseFloat(maxPrice),
  );
};

const filterByDateRange = (
  data: TCourse[],
  startDate: string,
  endDate: string,
): TCourse[] => {
  return data.filter(
    (course: TCourse) =>
      course.startDate >= startDate && course.endDate <= endDate,
  );
};

const sortData = (
  data: TCourse[],
  sortBy: keyof TCourse,
  sortOrder: 'asc' | 'desc',
): TCourse[] => {
  const order = sortOrder === 'asc' ? 1 : -1;
  return data.sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
};

const queryBuilder = async (
  data: TCourse[],
  query: Record<string, unknown> | undefined,
): Promise<TCourse[]> => {
  if (!query) {
    return data;
  }

  let queryBuilderData: TCourse[] = [...data];
  const queryObj = { ...query };
  CourseExcludeFields.forEach((el) => delete queryObj[el]);

  if (Object.keys(queryObj).length === 0) {
    if (query.level) {
      queryBuilderData = filterByLevel(queryBuilderData, query.level as string);
    }

    if (query.tags) {
      queryBuilderData = filterByTags(queryBuilderData, query.tags as string);
    }

    if (query.minPrice && query.maxPrice) {
      queryBuilderData = filterByPriceRange(
        queryBuilderData,
        query.minPrice as string,
        query.maxPrice as string,
      );
    }

    if (query.startDate && query.endDate) {
      queryBuilderData = filterByDateRange(
        queryBuilderData,
        query.startDate as string,
        query.endDate as string,
      );
    }

    if (query.page || query.limit) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 2;
      const skip = (page - 1) * limit;
      const titles = queryBuilderData.map((course) => course.title);
      queryBuilderData = await Course.find({
        title: { $in: titles },
      })
        .skip(skip)
        .limit(limit);
    }

    if (
      [
        'title',
        'price',
        'startDate',
        'endDate',
        'language',
        'durationInWeeks',
      ].includes(query.sortBy as string) &&
      query.sortOrder
    ) {
      queryBuilderData = sortData(
        queryBuilderData,
        query.sortBy as keyof TCourse,
        query.sortOrder as 'asc' | 'desc',
      );
    }

    return queryBuilderData;
  } else if (Object.keys(queryObj).length > 0) {
    queryBuilderData = await Course.find(queryObj);

    if (query.level) {
      queryBuilderData = filterByLevel(queryBuilderData, query.level as string);
    }

    if (query.tags) {
      queryBuilderData = filterByTags(queryBuilderData, query.tags as string);
    }

    if (query.minPrice && query.maxPrice) {
      queryBuilderData = filterByPriceRange(
        queryBuilderData,
        query.minPrice as string,
        query.maxPrice as string,
      );
    }

    if (query.startDate && query.endDate) {
      queryBuilderData = filterByDateRange(
        queryBuilderData,
        query.startDate as string,
        query.endDate as string,
      );
    }

    if (query.page || query.limit) {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 2;
      const skip = (page - 1) * limit;
      const titles = queryBuilderData.map((course) => course.title);
      queryBuilderData = await Course.find({
        title: { $in: titles },
      })
        .skip(skip)
        .limit(limit);
    }

    if (
      [
        'title',
        'price',
        'startDate',
        'endDate',
        'language',
        'durationInWeeks',
      ].includes(query.sortBy as string) &&
      query.sortOrder
    ) {
      queryBuilderData = sortData(
        queryBuilderData,
        query.sortBy as keyof TCourse,
        query.sortOrder as 'asc' | 'desc',
      );
    }

    return queryBuilderData;
  }

  return Course.find(query);
};

export default queryBuilder;
