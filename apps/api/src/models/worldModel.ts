import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
    HasManyGetAssociationsMixin,
    BelongsToGetAssociationMixin,
} from '@sequelize/core';
import {
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Unique,
    Attribute,
    HasMany,
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
    @Unique
    @NotNull
    declare name: string;

    @Attribute(DataTypes.INTEGER)
    declare userId: ForeignKey<User['id']>;

    declare user: NonAttribute<User>;
    declare getUser: BelongsToGetAssociationMixin<User>;

    @HasMany(() => PointOfInterest, {
        foreignKey: 'worldId',
        inverse: {
            as: 'world',
        },
    })
    declare points: NonAttribute<PointOfInterest>;
    declare getPoints: HasManyGetAssociationsMixin<PointOfInterest>;
}
