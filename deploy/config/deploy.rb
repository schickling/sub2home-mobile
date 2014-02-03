set :application, "sub2home/mobile"
set :repo_url, "git@github.com:schickling/sub2home-mobile.git"

set :deploy_to, "/var/www/mobile"

set :log_level, :info
set :keep_releases, 8

namespace :deploy do

  desc "Restart"
  task :restart do
  end

  desc "Build"
  before :updated, :build do
    on roles(:app), in: :parallel do
      within release_path  do
        execute :npm, "install --silent"
        execute :bower, "install --silent"
      end
    end
    on roles(:app) do
      within release_path do
        execute :gulp, "less"
      end
    end
  end

  after :finishing, "deploy:cleanup"

end
