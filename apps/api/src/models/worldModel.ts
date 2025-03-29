import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
    ForeignKey,
    NonAttribute,
} from '@sequelize/core';
import {
    PrimaryKey,
    AutoIncrement,
    NotNull,
    Unique,
    Attribute,
} from '@sequelize/core/decorators-legacy';
import { User } from './userModel';

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
}
