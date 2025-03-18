from app.WebAMS import app
import uvicorn

# 创建日志配置字典
log_config = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(levelname)s - %(name)s - %(message)s",
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        "rotating_file": {
            "formatter": "default",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "WebAMS_log.log",  # 日志文件名
            "maxBytes": 1024 * 1024 * 50,  # 日志文件最大大小，这里是50MB
            "backupCount": 5,  # 保留旧文件的最大数量
        },
    },
    "loggers": {
        "": {  # 应用程序的根日志器
            "handlers": ["default", "rotating_file"],
            "level": "INFO",
        },
    },
}

if __name__ == '__main__':
    uvicorn.run('run:app', host="0.0.0.0" ,port=8000, log_config=log_config, reload=True)