import { ApiError } from "../../lib/custom-api-error-class";
import { getSlug } from "../../lib/utils";
import { PortfolioModel } from "../../models/portfolio.model";
import { ServiceModel } from "../../models/service.model";

// CREATE INITIAL SERVICE
export const createInitialService = async (title: string) => {
  if (!title) throw new ApiError("Title is Required.", 404);

  // isExist
  const isExist = await ServiceModel.findOne({ title }).select([title]).exec();

  if (isExist) throw new ApiError("This name is exist.", 404);

  const slug = getSlug(title);

  // create
  const Service = await ServiceModel.create({ title, slug: slug });

  return Service;
};

// UPDATE SERVICE TITLE, DESCRIPTION & FEATURED
export const updateServiceTexts = async ({
  id,
  title,
  short_description,
  description,
  active,
  featured,
}: {
  id: string;
  title: string;
  short_description: string;
  description: string;
  active: boolean;
  featured: boolean;
}) => {
  if (!id) throw new ApiError("Id is required.", 404);

  if (!title) throw new ApiError("Title is required.", 404);

  const newData: any = {
    title,
    slug: getSlug(title),
    short_description,
    description,
    active,
    featured,
  };

  const updatedservice = await ServiceModel.findByIdAndUpdate(id, newData, {
    new: true,
  }).exec();

  if (!updatedservice) throw new ApiError("Service update failed!", 404);

  return updatedservice;
};

// ADD RELATED PORTFOLIOS
export const addRelatedPortfoliosToService = async ({
  id,
  related_portfolio_ids,
}: {
  id: string;
  related_portfolio_ids: string[];
}) => {
  if (!id) throw new ApiError("Id is required!", 404);

  if (!related_portfolio_ids.length)
    throw new ApiError("Related portfolio id is required!", 404);

  const servicePromise = ServiceModel.findById(id).exec();
  const addedPorfolioPromises = related_portfolio_ids.map((portfolio_id) => {
    return PortfolioModel.findById(portfolio_id).exec();
  });

  const [service, ...addedPortfolios] = await Promise.all([
    servicePromise,
    ...addedPorfolioPromises,
  ]);

  if (!service) throw new ApiError("Service not found!", 404);
  if (addedPortfolios.includes(null))
    throw new ApiError("One or more portfolio not found", 404);

  addedPortfolios.map((related_portfolio) => {
    const isAdded = service?.related_portfolios?.find(
      (item) =>
        (item._id as any).toString() ===
        (related_portfolio?._id as any).toString()
    );
    if (!isAdded)
      service.related_portfolios.push(related_portfolio?._id as any);
  });

  return await service.save();
};

// ADD RELATED SERVICES
export const addRelatedServicesToService = async ({
  id,
  related_service_ids,
}: {
  id: string;
  related_service_ids: string[];
}) => {
  if (!id) throw new ApiError("Id is required!", 404);

  if (!related_service_ids.length)
    throw new ApiError("Related service id is required!", 404);

  const servicePromise = ServiceModel.findById(id).exec();
  const addedServicePromises = related_service_ids.map((service_id) => {
    return ServiceModel.findById(service_id).exec();
  });

  const [service, ...addedServices] = await Promise.all([
    servicePromise,
    ...addedServicePromises,
  ]);

  if (!service) throw new ApiError("Service not found!", 404);
  if (addedServices.includes(null))
    throw new ApiError("One or more service not found", 404);

  addedServices.map((related_service) => {
    const isAdded = service?.related_services?.find(
      (item) =>
        (item._id as string).toString() ===
        (related_service?._id as string).toString()
    );

    if (!isAdded) service.related_services.push(related_service?._id as any);
  });

  return await service.save();
};

// REMOVE RELATED PORTFOLIO
export const removeRelatedPortfolioFromService = async ({
  id,
  related_portfolio_id,
}: {
  id: string;
  related_portfolio_id: string;
}) => {
  if (!id) throw new ApiError("Id is required!", 404);
  if (!related_portfolio_id)
    throw new ApiError("Related portfolio id is required!", 404);

  const service = await ServiceModel.findById(id).exec();

  if (!service) throw new ApiError("Service not found!", 404);

  const isExist = service.related_portfolios.find(
    (item) => item.toString() === related_portfolio_id
  );

  if (!isExist)
    throw new ApiError("No Such Id founds in related Portfolios!", 404);

  const updatedRelatedPortfolioIds = service.related_portfolios.filter(
    (item) => item.toString() !== related_portfolio_id
  );

  // set the new related portfolios
  service.related_portfolios = updatedRelatedPortfolioIds as any;

  return await service.save();
};

// REMOVE RELATED SERVICE
export const removeRelatedServiceFromService = async ({
  id,
  related_service_id,
}: {
  id: string;
  related_service_id: string;
}) => {
  if (!id) throw new ApiError("Id is required!", 404);
  if (!related_service_id)
    throw new ApiError("Related service id is required!", 404);

  const service = await ServiceModel.findById(id).exec();

  if (!service) throw new ApiError("service not found!", 404);

  const isExist = service.related_services.find(
    (item) => item.toString() === related_service_id
  );

  if (!isExist)
    throw new ApiError("No Such Id founds in related services!", 404);

  const updatedRelatedServiceIds = service.related_services.filter(
    (item) => item.toString() !== related_service_id
  );

  // set the new related services
  service.related_services = updatedRelatedServiceIds as any;

  return await service.save();
};

// DELETE SERVICE
export const removeService = async (id: string) => {
  if (!id) throw new ApiError("Id is required!", 404);
  const service = await ServiceModel.findByIdAndDelete(id).exec();
  if (!service) throw new ApiError("Service not found!", 404);
  return service;
};
