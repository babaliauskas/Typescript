import { DataTypes, Model } from 'sequelize';
import db from '../config/database/database.config';

interface ITodo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    completedAt: string;
}

export class TodoInstance extends Model<ITodo> {}

const now = new Date().toISOString();

TodoInstance.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: now
        },
        completedAt: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: db,
        tableName: 'todos'
    }
);
