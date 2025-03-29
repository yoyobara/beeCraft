import {
    CreationOptional,
    DataTypes,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    Unique,
    NotNull,
    HasMany,
} from '@sequelize/core/decorators-legacy';
import { World } from './worldModel';

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull
    @Unique
    declare email: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare fullName: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare passwordHash: string;

    @HasMany(() => World, {
        foreignKey: 'userId',
        inverse: {
            as: 'author',
        },
    })
    declare worlds: NonAttribute<World>;

    declare getPosts: HasManyGetAssociationsMixin<World>;
}
