import React, { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  UserX,
  Search,
  Plus,
  Users,
  Shield,
  Ban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { schoolAllUsers } from "../../features/user/userSlice";
import { motion } from "framer-motion";

const Utilisateur = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users = [], loading } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredUsers = useMemo(() => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()) ||
          u.nomUtilisateur?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (roleFilter) {
      data = data.filter((u) => u.role === roleFilter);
    }

    if (statusFilter) {
      data = data.filter((u) => String(u.isActive) === statusFilter);
    }

    return data;
  }, [users, search, roleFilter, statusFilter]);

  const roleColors = {
    super_admin: "bg-red-100 text-red-700",
    admin: "bg-purple-100 text-purple-700",
    manager: "bg-blue-100 text-blue-700",
    caissier: "bg-green-100 text-green-700",
    secretaire: "bg-yellow-100 text-yellow-700",
  };

  useEffect(() => {
    dispatch(schoolAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-sky-200 border-t-sky-900 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestion des utilisateurs
          </h1>

          <p className="text-gray-500 mt-1">
            Administration des comptes utilisateurs
          </p>
        </div>

        <button
          onClick={() => navigate("/add-new-user")}
          className="
            flex items-center gap-2
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            px-5 py-3
            rounded-xl
            shadow-lg
            hover:scale-105
            transition
          "
        >
          <Plus size={18} />
          Ajouter utilisateur
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total utilisateurs</p>

              <h2 className="text-3xl font-bold mt-2 dark:text-white">
                {users.length}
              </h2>
            </div>

            <Users className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Utilisateurs actifs</p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {users.filter((u) => u.isActive).length}
              </h2>
            </div>

            <Shield className="text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Utilisateurs bloqués</p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {users.filter((u) => !u.isActive).length}
              </h2>
            </div>

            <Ban className="text-red-600" />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-3.5
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-3
                rounded-xl
                border
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="caissier">Caissier</option>
            <option value="secretaire">Secrétaire</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Tous les statuts</option>

            <option value="true">Actif</option>

            <option value="false">Bloqué</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left p-4">Utilisateur</th>

                <th className="text-left p-4">Rôle</th>

                <th className="text-left p-4">Statut</th>

                <th className="text-left p-4">Dernière connexion</th>

                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <div className="py-20 text-center">
                  <Users size={70} className="mx-auto text-gray-300 mb-4" />

                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Aucun utilisateur trouvé
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Aucun résultat ne correspond à votre recherche.
                  </p>

                  <button
                    onClick={() => navigate("/add-new-user")}
                    className="
                        mt-5
                        px-5
                        py-3
                        bg-blue-600
                        text-white
                        rounded-xl
                        hover:bg-blue-700
                      "
                  >
                    Ajouter un utilisateur
                  </button>
                </div>
              ) : (
                <>
                  {filteredUsers.map((u) => (
                    <tr
                      key={u._id}
                      className="
                        border-t
                        hover:bg-gray-50
                        dark:hover:bg-gray-700
                      "
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
            w-10
            h-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
                          >
                            {u.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold dark:text-white">
                              {u.name}
                            </p>

                            <p className="text-xs text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${roleColors[u.role]}
        `}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${
            u.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
                        >
                          {u.isActive ? "Actif" : "Bloqué"}
                        </span>
                      </td>

                      <td className="p-4 text-sm text-gray-500">
                        {u.lastLogin
                          ? new Date(u.lastLogin).toLocaleString()
                          : "-"}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200">
                            <Eye size={18} />
                          </button>

                          <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200">
                            <Pencil size={18} />
                          </button>

                          <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200">
                            <UserX size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
