import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    HasManyGetAssociationsMixin,
    HasManyCreateAssociationMixin,
} from '@sequelize/core';
import {
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Attribute,
    HasMany,
    DeletedAt,
} from '@sequelize/core/decorators-legacy';
import { User } from './userModel';
import { PointOfInterest } from './pointOfInterestModel';

export class World extends Model<
    InferAttributes<World>,
    InferCreationAttributes<World>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare name: string;

    @DeletedAt
    declare deletedAt: Date | null;

    @Attribute(DataTypes.INTEGER)
    declare userId: ForeignKey<User['id']>;

    @HasMany(() => PointOfInterest, {
        foreignKey: 'worldId',
        inverse: {
            as: 'world',
        },
    })
    declare points: NonAttribute<PointOfInterest>;
    declare getPoints: HasManyGetAssociationsMixin<PointOfInterest>;
    declare createPoint: HasManyCreateAssociationMixin<
        PointOfInterest,
        'worldId'
    >;
}
