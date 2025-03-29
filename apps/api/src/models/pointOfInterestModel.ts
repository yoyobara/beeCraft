import {
    BelongsToGetAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from '@sequelize/core';
import {
    Attribute,
    PrimaryKey,
    AutoIncrement,
    NotNull,
} from '@sequelize/core/decorators-legacy';
import { World } from './worldModel';

export class PointOfInterest extends Model<
    InferAttributes<PointOfInterest>,
    InferCreationAttributes<PointOfInterest>
> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare x: number;

    @Attribute(DataTypes.INTEGER)
    declare y: number | null;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare z: number;

    @Attribute(DataTypes.TEXT)
    declare notes: string | null;

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    declare isEnd: boolean;

    @Attribute(DataTypes.INTEGER)
    declare worldId: ForeignKey<World['id']>;

    declare world: NonAttribute<World>;
    declare getWorld: BelongsToGetAssociationMixin<World>;
}
