import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from '~/commons/abstract/abstract.service';
import { INotification } from '../schemas/interfaces/notification.interface';
import { notificationModelName } from '../schemas/notification.model-name';
import { PaginationInfo } from '~/commons/graphql/pagination';
import { normalizeQueryDataConfig } from '~/commons/utils';
import { QueryDataConfigInput } from '~/commons/graphql/query-data-config.input';

@Injectable()
export class NotificationService extends AbstractService<INotification> {
  constructor(
    @InjectModel(notificationModelName) model: Model<INotification>,
    private eventEmitter2: EventEmitter2,
  ) {
    super(model);
  }

  async create(notificationInput: INotification): Promise<INotification> {
    const notification = await this.insertOne(notificationInput);
    this.eventEmitter2.emit('notification.emit', notification);
    return notification;
  }

  async findManyNotificationsAndPaginate(
    user: any,
    queryConfig?: QueryDataConfigInput,
  ): Promise<{ results: any[]; pagination: PaginationInfo }> {
    // Normaliser les paramètres de configuration de la requête
    const { limit, page = 1, orderBy } = normalizeQueryDataConfig(queryConfig);

    // Étape 1 : Construire le filtre de base
    const queryFilter = { organization: user.organization };

    // Étape 2 : Calculer le nombre total d'éléments
    const totalItems = await this.aggregateTotal([
      {
        $match: queryFilter,
      },
      {
        $count: 'total',
      },
    ]);

    if (!totalItems) {
      return {
        results: [],
        pagination: {
          totalItems: 0,
          pageCount: 0,
          currentPage: 0,
          pageSize: 0,
        },
      };
    }

    // Étape 3 : Calculer le skip
    const skip = (page - 1) * limit;

    // Étape 4 : Utiliser l'agrégation avec la pagination et le tri
    const results = await this.aggregateMany([
      {
        $match: queryFilter,
      },
      {
        $set: {
          viewedByMe: {
            $cond: [{ $in: [user._id, '$viewedBy'] }, true, false],
          },
        },
      },
      {
        $sort: { [orderBy.property]: orderBy.direction || -1 },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $set: { id: '$_id' }, // Si nécessaire, ajouter un ID explicite
      },
    ]);

    // Étape 5 : Calculer les informations de pagination
    const pageCount = Math.ceil(totalItems / limit);
    const currentPage = page;
    const pageSize = results.length;

    // Créer l'objet PaginationInfo
    const pagination: PaginationInfo = {
      totalItems,
      pageCount,
      currentPage,
      pageSize,
    };

    return { results, pagination };
  }
}
