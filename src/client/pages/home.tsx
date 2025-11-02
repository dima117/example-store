import type { FC } from "react";
import { DocumentTitle } from "@/components/document-title";

/** главная страница */
export const Home: FC = () => {
  return (
    <>
      <DocumentTitle text="Home" />
      <div className="row">
        <div className="col bg-secondary text-white py-5 bg-opacity-75">
          <p className="display-3">Example store</p>
          <p className="lead">Приложение-тренажер для написания автотестов</p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 col-md-6 bg-light py-3">
          <h2>Реалистичная предметная&nbsp;область</h2>
          <p className="lead">
            Проект имитирует реализацию интернет-магазина. Код написан в упрощенном, учебном стиле
          </p>
        </div>
        <div className="col-12 col-md-6 bg-light py-3">
          <h2>Реалистичный стек технологий</h2>
          <p className="lead">
            Приложение написано на typescript+react со сборкой на vite, есть серверная часть. Использованы популярные
            библиотеки: react-router, react-query, redux-toolkit
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>
            Перейтите в{" "}
            <a href="https://github.com/dima117/example-store" target="_blank">
              GitHub репозиторий
            </a>{" "}
            с исходным кодом приложения. Следуя инструкции в README, загрузите проект на свой компьютер, запустите его и
            проверьте в браузере, что всё работает.
          </p>
          <p>
            <strong>
              Попробуйте покрыть автотестами{" "}
              <a
                href="https://github.com/dima117/example-store?tab=readme-ov-file#функциональные-требования"
                target="_blank"
              >
                функциональные требования
              </a>
              , указанные в README.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};
